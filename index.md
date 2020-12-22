---
layout: home
pagination: 
  enabled: true
---

{% for post in paginator.posts %}
{% assign length = paginator.posts %}
{% assign lengthID = site.posts.size | plus: 1%}
  <div id="js-{{ forloop.index }}" class="post -fixed{% if forloop.index == 1 %} -first{% endif %}{% if forloop.index == length %} -last{% endif %}">
    <span id="{{ post.url | remove: '/' }}">
      
      <div class="post-header container-principal">
        <h2 class="post-title">
          <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
        </h2>
      </div>
    
    </span>

{% picture  {{ site.baseurl }}{{ site.assets }}/posts/{{post.image}}.jpg --img class="post-image" --img alt="{{post.image}}" loading="lazy" style="z-index: {{ lengthID | minus: forloop.index }}"%}

{% comment %}    
    <img class="post-image" style="z-index: {{ lengthID | minus: forloop.index }}" src="{{ site.baseurl }}{{ site.assets }}/posts/{{post.image}}.jpg" alt="{{post.image}}" loading="lazy">
{% endcomment %}

    <div class="container-total">
    {{ post.content }}
    </div>
  </div>
{% endfor %}