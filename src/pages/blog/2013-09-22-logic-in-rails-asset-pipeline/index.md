---
path: "/blog/logic-in-rails-asset-pipeline"
date: "2013-09-22T20:19:00"
title: "Add logic to your Rails asset pipeline manifests"
---

Recently, while reading [Discourse’s source code](https://github.com/discourse/discourse), I learned that Rails asset pipeline Javascript/CSS manifests are just plain old JS/CSS files and can be passed through a templating engine. This means you can add the .erb extension to add logic. This is useful if you want to use a prod-only CDN, serve dev-only Javascript debug code, or in Discourse’s case, dynamically load plugin assets.

When including assets from Ruby code in your manifest, use Sprocket’s require_asset method ([rubydoc](https://www.rubydoc.info/github/sstephenson/sprockets/Sprockets/Context:require_asset)).

From [Discourse’s application.js.erb](https://github.com/discourse/discourse/blob/ef82b66e95324805e3d3d982d2052c52eee4eca7/app/assets/javascripts/application.js.erb):

```ruby
//= require ./env
//= require ./discourse/components/probes.js

<%
# ...

if Rails.env.development?
  require_asset ("./external_development/ember.js")
else
  require_asset ("./external_production/ember.js")
end

require_asset ("./main_include.js")

# Include plugin javascripts
DiscoursePluginRegistry.javascripts.each do |js|
  require_asset(js)
end
%>
```
