# README

This is my fork of [json-server](https://github.com/typicode/json-server) that aims to solve [this](https://github.com/typicode/json-server/issues/814) limitation of the original library i.e., provide a way to access and modify nested objects.

This fork is not intended to be backwards compatible with the original library. It introduces a new API that is accessed via `/$` endpoint e.g.:
`localhost:3000/$`. The `/$` is pointer to the root of the json database. Nested objects can be accessed and modified using GET, PUT and DELETE
requests to `/$/path/of/nested/object`. PUT request will perform an UPSERT operation (create if not exists else replace with new value).
DELETE request does not throw error if element does not exist.

One nifty feature of this library is the ability to truncate the GET response upto a user specified `depth`. Imagine you have a deeply nested
JSON object and you are querying for the root. Think of the root directory on your hard drive. You want to get results but want to limit them
to a certain depth or level to limit the amount of data that might be returned by the server. You can do this by adding a query paramater called
`depth` to the GET request (`depth >= 0`).

The new API is intended to work with key-value stores (dictionaries) not arrays. An example file is provided [here](src/cli/collections.json). Run the server
with this example file by executing:

```
$ ./src/cli/bin.js ./src/cli/collections.json
```

Then, to get a resource:

```
curl -X GET http://localhost:3000/$/agatha-christe?depth=2
```

To upsert a resource:

```
curl -X PUT \
-H "Content-Type: application/json" \
-d '{"documents":{}, "size": 0}' \
http://localhost:3000/$/arthur-conan-doyle
```

To delete a resource:

```
curl -X DELETE http://localhost:3000/$/arthur-conan-doyle
```
