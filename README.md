##Description
**CMS-Downloader** is a web app which allows you to easily download all your solutions to problems
on the [Italian training platform](http://cms.di.unipi.it) for *IOI* (International Olympiads in Informatics).
![Alt text](https://www.flickr.com/photos/136559306@N07/shares/7vv02Y)

##Technical details
**CMS-Downloader** is written using the *NodeJs* web application framework *Express*.

The structure of the important files of the project is as follows :

* **CMS-Downloader**
    * **logic**
        * *index.js*
        * *submissions_retriever.js*
            * It contains the logic to retrieve the files from the online platform
        * *token_retriever.js*
            * It contains the logic to retrieve the *token* for a given user
    * **public**
        * **javascripts**
            * *global.js*
                * *JQuery* which sends *POST* requests from the client to the server
    * **routes**
        * *index.js*
            * It handles the requests the server receives
    