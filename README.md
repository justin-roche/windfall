### **Intro**

Windfall is an in-progress, proof-of-concept web scraper utilizing Cypress.js. It aims to be reusable and generic, while being versatile enough to carry out most common scraping tasks. It is called by an Express server and communicates its results and progress using node-ipc. A React front end is included allowing the user to run one scrape job or multiple jobs based on their selections, to see the results of the scrape, and approve results individually or as a batch for saving to a Mongo database.

### **How it works**

Scrape definitions located in the fixtures folder provide the list of definitions for the scrape jobs.

A definition looks like this:

```js
  {
    name: 'Monster: React Jobs',
    commands: [
      {
        type: 'navigate',
        url: 'https://www.monster.com',
      },
      {
        type: 'search',
        target: '#q2,#keywords2',
        term: ['react'],
        forEach: 'term',
      },
      {
        type: 'click',
        target: '#loadMoreJobs',
        repeat: 2,
      },
      {
        type: 'getListItems',
        parentSelector: '#SearchResults>.card-content',
        $: 'parentSelector',
        ignore: '.apas-ad',
        count: 10,
        readFields: {
          location: '.location',
          company: '.company',
          title: '.title',
          date: 'time',
          originalLink: { type: 'link', target: '.title a' },
        },
        forEachResult: [
          {
            type: 'getDetailData',
            target: ['$', '.title'],
            contentTarget: '#tab-details',
            interrupt: '#expired-job-alert button',
            readFields: {
              salary: '.mux-job-cards .mux-card',
              description: '#JobBody',
            },
          },
        ],
      },
    ],
    document: {
      source: 'Monster',
      transformFields: 'transformMonsterResults',
    },
  }

```

The scrape is accomplished in three steps:

- The definition is parsed into a command tree structure where branches are equivalent to the task loops carried out by the scrape job.
- The tree is read in a depth-first traversal to generate the list of commands.
- The commands are executed in linear order, since all Cypress commands are registered by Cypress to the same queue.

### **Why use a tree? Why not use loops or generators?**

Scrapers have to handle arbitrary loops. I thought about generators, but trees allow for easier debugging of the core feature, the generic API, and allow for more powerful reads of the eventual results, as hierarchical relationships between commands are retained through the lifetime of the scrape job. Because we are doing scraping, not crawling, there is limited need for generating new comand queues on the fly. The tree representation and the command list could (eventually) be generated only once, with only the execution of the command list being run each time the scrape is executed. So the tree operations could have minimal performance impacts while preserving rich data relationships between the commands.

## License

    MIT License

    Copyright (c) 2020 Justin Roche

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
