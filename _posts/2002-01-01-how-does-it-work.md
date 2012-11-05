--- 
category: overview
heading: How does it work?
---

Elsewhere crawls the web page at the supplied URL and looks for links that contain the attribute [`rel=me`][rel=me]:

    <a href="http://dharmafly.com" rel="me">Dharmafly</a>

The `rel=me` attribute is a microformat to assert that the link is to a website, page or resource that is owned by (or is about) the same person that at the target URL. For example, if the target URL is a person's Twitter profile page, then that page may contain a link to the person's home page or main website.

The URLs in the `rel=me` links are then crawled for further `rel=me` links and so on, building a comprehensive graph along the way.

For example, a person's Twitter profile page may link to his or her home page, which then links to the person's Last.fm, Flickr, Facebook, GitHub, LinkedIn and Google+ profiles, as well as the person's company website. The information in the graph is all public, having been added by the person when they created their social media profiles and web pages.

Once Elsewhere has run out of `rel=me` links to crawl, it returns the list of URLs it has found, representing the person's 'social graph'.


## Strict Mode and verified links

Elsewhere can make strict checks to verify that that each linked URL is indeed owned by the same person as the original site. After all, anyone could create a website, add a `rel=me` link to [Elvis Presley][elvis]'s website and claim to be him.

Elsewhere checks if the linked page itself has a `rel=me` link back to the original URL. If there is such a reciprocal link, then the relationship is deemed to be 'verified'.

But Elsewhere is more sophisticated than that. The reciprocal link doesn't have to be directly between the two sites. For example, if a Twitter account links to a GitHub account, which links to a home page, which links back to the Twitter account, then the relationship between the Twitter account and home page will be verified, even though the two don't directly link to each other.

Elsewhere operates in non-strict mode by default, in which it will return both verified and unverified URLs. This mode is useful because many profile pages and personal websites lack `rel=me` links, making it difficult to verify those links and leading to many legitimate links being missed.

To be absolutely sure of the stated relationships, turn on strict mode (by setting the `strict` option to `true`) and only verified URLs will be returned.


[rel=me]: http://microformats.org/wiki/rel-me
[elvis]: http://www.elvis.com