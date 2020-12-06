---
layout: home
pagination: 
  enabled: true
  trail: 
    before: 2 # The number of links before the current page
    after: 2  # The number of links after the current page
---

{% for post in paginator.posts %}
{% assign length = paginator.posts %}
{% assign lengthID = site.posts.size | plus: 1%}
  <div id="js-{{ forloop.index }}" class="post -fixed{% if forloop.index == 1 %} -first{% endif %}{% if forloop.index == length %} -last{% endif %}">
    <span id="{{ post.url | remove: '/' }}">
      
      <div class="post-header ctnr-golden">
        <h1 class="post-title">
          <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
        </h1>
      </div>
    
    </span>
    <img class="post-image" style="z-index: {{ lengthID | minus: forloop.index }}" src="{{ site.baseurl }}{{ site.assets }}/posts/{{post.image}}.jpg">
    <div class="ctnr-wide">
    {{ post.content }}
    </div>
  </div>
{% endfor %}