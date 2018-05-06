# Meth sync backend

This uses [express-pouchdb]() to expose a sync endpoint for PouchDB.

In _dev_ (default) mode the process uses an in-memory PouchDB. In _production_
mode it uses the externally hosted production CouchDB instance.

## Development

Deploy to https://zeit.co/now and note the deployed endpoint:

```shell
$ yarn deploy:dev
```

Enter this into your [meth-browser](https://github.com/meth-browser/meth) app config (see the browser repo README for instructions).

## Production

_TODO_
