# Meth backend

Live: https://meth.app

This uses [express-pouchdb](https://github.com/pouchdb/pouchdb-server#express-pouchdb) to expose a sync endpoint for PouchDB.

In _dev_ (default) mode the process uses an in-memory PouchDB. In _production_
mode it uses the externally hosted production CouchDB instance.

## Development

Deploy to https://zeit.co/now and note the deployed endpoint:

```shell
$ yarn deploy:dev
```

Enter the deployed endpoint URL into your [meth-browser](https://github.com/meth-browser/meth) app config (see the browser repo README for instructions).

## Production

The production deployment needs to connect to our hosted production CouchDB
instance. The following _secret_ variables thus need to be setup:

```shell
$ now secret add couchdb_url <...URL...>
$ now secret add couchdb_username <...username...>
$ now secret add couchdb_password <...username...>
```

Once this is done, do:

```shell
$ yarn deploy:prod
```

Once done the deployed backend should be accessible at https://meth.app
