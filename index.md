---
layout: home
---
{% for post in site.posts %}
{% assign length = site.posts.size %}
{% assign lengthID = site.posts.size | plus: 1%}

  <div id="js-{{ forloop.index }}" class="post -fixed{% if forloop.index == 1 %} -first{% endif %}{% if forloop.index == length %} -last{% endif %}">
    <span id="{{ post.url | remove: '/' }}">
    {% if forloop.index != 1 %}
      <div class="post-header ctnr-golden">
        <h1 class="post-title">
          <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
        </h1>
      </div>
    {% endif %}
    </span>
    <img class="post-image" style="z-index: {{ lengthID | minus: forloop.index }}" src="{{ site.baseurl }}{{ site.assets }}/posts/{{post.image}}.jpg">
    <div class="ctnr-wide">
    {{ post.content }}
    </div>
  </div>
{% endfor %}