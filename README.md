# ShrinkUrl

<p align="center">
	<a href="https://nodejs.org/en/" alt="Powered by: Node v14.1.0">
        <img src="https://badgen.net/badge/Powered%20by/Node%20v14.1.0/43853D"/>
    </a>
	<a href="https://opensource.org/licenses/MIT" alt="License: MIT">
		<img src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
	</a>
</p>
<p align="center">
  <strong>Backend API written in node.js(Express) and MongoDB(Mongoose).</strong>
</p>

## Features

- Create an easy to remember ShortUrl.
- Verify each url before saving the equivalent ShortUrl to the database.
- Track the number of clicks on a ShortUrl.
- Ability to save url's starting with **_'ftp' _** verb such as **_"ftp://randomurl3.com"_**
- Support for Query parameters while accessing the entire collection of saved ShortUrl's.
- Leverages Node clusters for concurrent processing of incoming requests.

## Installation & Requirements

- Install [Node](https://nodejs.org/en/).
- Clone the repository.
- Use the Node Package Manager [npm](https://www.npmjs.com/) to install the required dependencie by navigating to the root directory of the cloned repository.

```bash
npm init
```

## Running the application

1. Navigate to the root directory and run the following command:

```bash
npm startClusters
```

2. Test the endpoints provided in the next section:

- Web browser
- Postman
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extention in VS Code - ###### NOTE: Click on the provided api call links under **"test/shrinkit.http"** directory after installing [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

## Endpoints

- **"test"** directory contains endpoints in the **"shrinkit.http"** and **"API Endpoints.postman_collection.json"** as Postman collection including test cases.
- A quick overview of the ShrinkUrl API structure:

* While making a request, the base url is: http://localhost:5000
* All of the API resources then start with: /api/urls
* A small subsets of API endpoints is listed below:

| Description                                    | Endpoints                                                        | Payload                                                                             | HTTP Methods |
| ---------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------ |
| Get all Url's:                                 | `http://localhost:5000/api/urls`                                 |                                                                                     | GET          |
| Get all Url's with Query Parameters:           | `http://localhost:5000/api/urls/?filter=clicks&gte=3&lte=9`      |                                                                                     | GET          |
| Get a Url by using id:                         | `http://localhost:5000/api/urls/5e9149266a89b96e9858c287`        |                                                                                     | GET          |
| Create a ShortUrl:                             | `http://localhost:5000/api/urls`                                 | content-type: contentTypeJson, "fullUrl" : "http://randomurl.com"                   | POST         |
| Create a ShortUrl with URL Encoded Parameters: | `http://localhost:5000/api/urls`                                 | content-type: application/x-www-form-urlencoded, "fullUrl" : "http://randomurl.com" | POST         |
| Update a Url:                                  | `http://localhost:5000/api/urls/update/5e9a9278eda7471da84dbfab` | content-type: contentTypeJson, "fullUrl" : "http://random2url.com"                  | PATCH        |
| Delete a Url by using id:                      | `http://localhost:5000/api/urls/delete/5e9149266a89b96e9858c287` |                                                                                     | DELETE       |
| Delete an entire collection:                   | `http://localhost:5000/api/urls/delete`                          |                                                                                     | DELETE       |

## License

[MIT](https://choosealicense.com/licenses/mit/)
