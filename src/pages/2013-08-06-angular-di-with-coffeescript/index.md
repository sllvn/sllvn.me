---
path: "/angular-di-with-coffeescript"
date: "2013-08-06T11:30:00"
title: "Angular controller dependency injection with Coffeescript"
---

After reading that Angular’s new “controller as” syntax available in 1.1.5 works quite nicely with Coffeescript, I was inspired to port some existing Javascript/Angular code to Coffeescript. What was not immediately apparent, however, was how to inject dependencies when using a Coffeescript class as the meat of an Angular controller.

I finally settled upon something like this:

```coffeescript
myApp.controller 'YoloController', ['$resource',
  class YoloController
    constructor: ($resource) ->
      @Hipster = $resource('/hipsters')
      @hipsters = @Hipsters.query()
]
```

Obviously, you would want to move this resource into a service. And if you needed to use the injection in other class methods, you would want to assign it to a class variable, using Coffeescript’s convenient constructor assignment syntax (note the @ sign): `constructor: (@$resource) ->`
