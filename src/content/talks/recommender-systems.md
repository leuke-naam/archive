---
title: 5 Lessons learned building a large recommender system
speaker: oscar-celma
---

Were The Rolling Stones right when they said, "You can't always get what you want; but if you try sometimes, you get what you need?". Recommendation systems are the crystal ball of the internet: predicting user intentions, making sense of big data, and delivering what people are looking for before they even know they want it.

Pandora internet radio is best known for the Music Genome Project; the most unique and richly labeled music catalog of millions of tracks. While this content-based approach to music recommendation is extremely effective and still used today as the foundation to the leading online radio service, Pandora has also collected more than a decade of contextual listener feedback in the form of more than 95 billion thumbs from millions of users who have created more than 13 billion stations. This session will look at how the interdisciplinary team at Pandora goes about making sense of these massive data sets to successfully make large scale music recommendations to the masses.

As opposed to other traditional recommender systems, such as Netflix or Amazon, which need to recommend a single item or static set, Pandora provides an evolving set of sequential items, and needs to react in just a few milliseconds when the user is unhappy with the proposed songs. Furthermore, a variety of factors (e.g. musicological, social, geographical, or generational) play a critical role in deciding what music to play to a user, and these factors vary dramatically across each individual listener.

In this talk I will present a dynamic ensemble learning system that combines curatorial data and machine learning models to provide a truly personalized experience. This approach allows us to switch from a lean back experience (exploitation) to a more exploration mode to discover new music tailored specifically to users individual tastes. I will also discuss how Pandora, a data-driven company, makes informed decisions about the features that are added to the core product based on the results of extensive online A/B testing.

Following this session the audience will have an in-depth understanding of how Pandora uses Big Data science to determine the perfect balance of familiarity, discovery, repetition and relevance for each individual listener, measures and evaluates user satisfaction and how our online and offline architecture stack plays a critical role in our success.
