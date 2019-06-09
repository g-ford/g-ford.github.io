---
title: 'Python Meta-Programming with APIs'
date: '2015-05-12T08:47:36Z'
tags: ['python', 'apis']
---

Meta-programming techniques can help turn some very ugly, repetative code into simple, beautiful code that is considerably easier to use. This article will show the application of some _basic_ python meta-programming techniques and how they were used to put a pythonic interface atop an obviously java based API.

The final code is [avialable on Github](https://github.com/alephnullplex/trendy) and [PyPi](https://pypi.python.org/pypi/trendy/)

## In the beginning

I have recently needed to interact with the [Trend Micro Deep Security](http://www.trendmicro.com.au/au/enterprise/cloud-solutions/deep-security/) SOAP API via python. The initial attempt used [suds](https://fedorahosted.org/suds/) in a pretty straight forward manner. This is a representative example that retrieves a list of `host` objects from Trend.

```python
def get_hosts(self, lookup=None, many=True):
    """
    Get a host, or list of hosts from Trend.

    If `lookup` is a string, find the matching host by name.
    If `lookp` is a number, find the matching host by id.
    If not `lookup` and `many` is True, get all hosts from trend.
    """

    trend_connection = TrendConnectionFactory(self.url, self.uid, self.pwd)
    trend_connection.authenticate()  # this logs in and gets a session id (sid)

    if trend_connection.error:
        # ...log and return

    try:
        if lookup is None and many:
            result = trend_connection.client.service.hostRetrieveAll(trend_connection.sid)
        else:
            if str(lookup).isdigit():
                result = trend_connection.client.service.hostRetrieve(lookup, trend_connection.sid)
            else:
                result = trend_connection.client.service.hostRetrieveByName(lookup, trend_connection.sid)

        trend_connection.client.service.endSession(trend_connection.sid)

    except suds.WebFault as detail:
        trend_connection.client.service.endSession(trend_connection.sid)
        # ...log and return
    except Exception as e:
        trend_connection.client.service.endSession(trend_connection.sid)
        # ...log and return

    default = {} # it was more complicated than this...
    if result is None:
        return default
    else:
        result
```

The trend API is surprising consistent. There are a number of resources such as `Host`, `FirewallRule`, `SecurityProfile` etc with the same basic endpoints: `retrieve`, `retrieveAll`, `retrieveByName`, `save` and `delete`. With at least 7 resources with 5 endpoints we ended up copying the above pattern over 35 times.

### Goals

My high level goals were to make it easier to use the API and look more pythonic. There are some initial glaring issues with the first attempt.

Session management is a very manual process. You have to explicitly log in, pass around the session id to every subsequent call and then explicitly end the session. This ended up being a very important issue as Trend allows admins to configure the number of concurrent sessions an API user can initiate. We hit the default limit pretty quickly jsut with the number of developers running tests trying to connect.

Another issue is this method is trying to do too much by having `lookup` overloaded and a bit cumbersome by making `lookup` and `many` co-related.

A less obvious issue is the unpleasant verboseness of using suds. Having `client.service` repeated for no real reason just clogs up the code. Additionally the camel case naming of the SOAP methods causes pylint to throw up some issues.

Finally the exception handling is biolerplate that adds little value so we will elimate that completely.

## Adding some context

Where some action must be taken before and/or after a block of code is a pattern that python calls context management. Most of the time this pattern is used for resource management - releasing files, database connections, locks etc.

We will add an `__enter__` and `__exit__` method to our connection class which enable it to be used as a context manager.[^1]

[^1]: For a more thorough intoduction to context managers see [Python with statement by example](http://preshing.com/20110920/the-python-with-statement-by-example/) or [PEP343](https://www.python.org/dev/peps/pep-0343/)

```python
class TrendConnection():
    def __init__(self, url, uid, pwd, environment):
        # set up Suds connection

    def __enter__(self):
        self.sid = self.client.service.authenticate(self.uid, self.pwd)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.client is not None:
            self.client.service.endSession(self.sid)
```

This only slightly improved the pattern by removing the explicit calls to `authenticate` and `endSession`. It had a huge impact on the **reliability** of the code though as we always close the session correctly. There is no longer the risk that any new code would forget to `endSession`.

```python
def get_hosts(self, lookup=None, many=True):
    """
    Get a host, or list of hosts from Trend.

    If `lookup` is a string, find the matching host by name.
    If `lookup` is a number, find the matching host by id.
    If not `lookup` and `many` is True, get all hosts from trend.
    """
    with TrendConnection(self.url, self.uid, self.pwd) as trend_connection:
        if lookup is None and many:
            result = trend_connection.client.service.hostRetrieveAll(trend_connection.sid)
        else:
            if str(lookup).isdigit():
                result = trend_connection.client.service.hostRetrieve(lookup, trend_connection.sid)
            else:
                result = trend_connection.client.service.hostRetrieveByName(lookup, trend_connection.sid)

        default = {}
        if result is None:
            return default
        else:
            result
```

### Removing explicit session management

The next goal was to remove the need to pass the session id around. The consistency of the Trend API was a huge benefit. It always put the session id in the last argument position. Anything that is consistent can be automated.

The idea is to intercept any calls to the API endpoints and inject the session id in the last position in the arguments list so the developer doesn't have to.

```python
# what we want to do
with TrendConnection(wsdl, user, pass) as trend:
    host = trend.client.services.hostRetrieveByName('some_host')
    host.name = "New name"
    trend.client.services.hostSave(host)
```

Here we start to actually use some meta-programming techniques. A lot of Python meta-programming hinges on a pair of functions - `getattr` and `setattr` - and their related double underscore versions. This family of functions allows us to inspect an objects attributes. In a dynamic language we can also use them to create attributes. [^2]

[^2]: For a more thorough introduction to these functions see [this blog post](http://chase-seibert.github.io/blog/2013/04/12/getattr-setattr.html).

```python
class TrendConnection():
    def __getattr__(self, attribute_name):
        def _wrapped(*args):
            args = args + (self.sid, )
            return getattr(self.client.service, attribute_name)(*args)

        return _wrapped
```

Here we are intercepting unknown attributes[^3] and assume they are a function call to the SOAP endpoints. The session id is added to the list of arguments and then we use `getattr` to actually invoke the function with the new args. This is all wrapped up and passed back to the caller.

[^3]: In the real code there is a [list of known method calls](https://github.com/alephnullplex/trendy/blob/master/trendy/connection.py#L69) to validate against. This avoids some runtime errors trying to invoke a method that does not exist.

This approach ends up being slightly nicer as it removes the cumbersome `client.services` and the session id so we end up with client code like so.

```python
with TrendConnection(wsdl, user, pass) as trend:
    host = trend.hostRetrieveByName('some_host')
    host.name = "New name"
    trend.hostSave(host)
```

## Many endpoints, same pattern

Again, Trends API consistency gives us more opportunites. Each of the resource types have the same set of endpoints avaialable, but the endpoints are decidedly not pythonic. We can fix that.

We'll create a simple interface that all services will follow.

```python
class ServiceBase(object):
    def __init__(self, trend):
    	self.trend = trend

    def all(self):
        """
        Return a collection of all the objects in Trend
        """
        pass

    def by_id(self, id)
        """
        Get a single object using the Trend ID
        """
        pass

    def by_ids(slef, ids):
        """
        Get a collection of objects using ids
        """
        return (self.by_id(id) for id in ids)

    def by_name(self, name):
        """
        Get a single object using the Trend name
        """
        pass

    def by_names(self, names):
        """
        Get a collection of objects using names
        """
        return (self.by_name(name) for name in names)

    def save(self, item):
    	"""
    	Create or update the item in Trend.
    	"""
    	pass
```

This is a pretty basic interface but it looks much better to our snake eyes. Let's go ahead and implement one.

### Creating a service

```python
class HostService(ServiceBase):
    def all(self):
        return trend.hostsRetrieveAll()

    def by_id(self, id):
        return trend.hostsRetrieveByID(id)

    def by_name(self, name):
        return trend.hostsRetrieveByName(name)

    def save(self, item):
        return trend.hostsSave(item)
```

So we can copy and paste that and replace all mention of `host` with `firewallRule` or `securityProfile` etc. for the other services. But I'm not a real fan of copy and paste. I think we can do even better than this.

Notice that all the endpoints start with a common prefix that represents the resource and all the actions are the same. What is consistent, can be automated.

```python
class ServiceBase(object):
    def __init__(self, trend, prefix):
    	self.trend = trend
    	self._prefix = prefix

    # the other base methods can be implmented in a similar fashion
    def all(self):
        return getattr(self.trend, self._prefix + 'RetrieveAll')()


class HostService(ServiceBase):
    def __init__(self, trend):
        super(HostService, self).__init__(trend, 'hosts')
```

Here we have a default implementation in the base class using a `prefix` to determine which method to call on trend via `getattr`.

Adding additonal resources is now only three lines of code instead of overriding all the methods.

Let's see what this api looks like now.

```python
with TrendConnection(wsdl, user, pass) as trend:
    host_service = HostService(trend)
    host = host_service.by_name('some_name')
    host.name = "New name"
    host_service.save(host)
```

This is considerably nicer than where we began. But I think we can still do better.

## Auto-creating the services

Needing to manually instatiate each service is a little bit annoying. Something like this would be even simpler.

```python
with TrendConnection(wsdl, user, pass) as trend:
    host = trend.hosts.by_name('some_name')
    host.name = "New name"
    trend.hosts.save(host)
```

This will be a lot simpler particularly when we need to start interacting with multiple resources. To do this we can simply add each service as an attribute to the `TrendConnection` class. But, again, I don't like typing that all in. When I add another `Service` I just want it to automatically be available.

This is easily acheivable by getting the list of `Service` classes and adding them to the `Connection` object using `setattr`.

```python
class TrendConnection(object):
    def __init__(self):
        # usual setup
        self._add_services()

    def _add_services(self):
        all_services = [service for service in dir(services)
                          if service.name.endswith('Service')]
        for service in all_services:
            setattr(self, snake_case(service.__class__.__name__), service)
```

You may have noticed that I called the `ServiceBase` a slightly different naming format to the `HostService`. This is so that I can easily identify actual services in the `services` module and then attach them to the connection object.

The `snake_case` function is a simple one that turns CamelCase into a snake_case so that the attributes pass pylint.

## Conclusion

The final results of the API usage are considerably cleaner and definately more pythonic. Adding new services is now a simple three line affair rather than having to copy and paste a lot of boiler plate.

All this comes at a small cost of developer understanding. We had to document very well as some of the code was not immediately obvious to less experienced developers.
