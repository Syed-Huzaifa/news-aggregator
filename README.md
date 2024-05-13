# News Aggregator

## Description
A news app that displays content from three different sources i.e The News API, The New York Times API and The Guardian API.

## Features
1. User can set their preferences as to what type of news they want to see on their feed.

2. User can filter through the news articles based on three different filters i.e Categories, Sources, and custom date range.

3. Infinite scrolling for smooth and uninterrupted scroll through the news articles.

## Table of Contents
- [Installation](#installation)
- [Incomplete Features](#incompletion)

## Installation
To set up the application, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/news-aggregator.git
    ```

2. Navigate to the project directory:
    ```bash
    cd news-aggregator
    ```

3. Create Docker image:
    ```bash
    docker-compose up
    ```
4. See the app in its glory:
    Open your web browser and visit `http://localhost:3000` to access the news aggregator.

Environment variables are exposed in the repository for the ease of the reviewer.

## Incomplete Features

1. I wasn't able to implement the setting feature for all three sources due to inconsistent data in them. The reason for that is that I already merged responses from all three sources into one single data structure in order to keep the components generic and reusable.

2. For the search filters, again, the inconsistency throughout all three sources forced me to filter the results from only one source which had all the required search parameters.
