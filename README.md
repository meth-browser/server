# Meth backend

Live: https://meth.app

This uses [express-pouchdb](https://github.com/pouchdb/pouchdb-server#express-pouchdb) to expose a sync endpoint for PouchDB.

## Branches

* `dev` - Default branch, where latest development takes place.
* `master` - Production branch, deployed automatically via Travis CI.

## Running

_Note: Developed and tested with Node 8.10.0_

Two running modes:

* `development`: (default) the process uses an in-memory PouchDB.
* `production`: uses the externally hosted production CouchDB instance.

By default it runs in `development` mode:

```shell
$ yarn dev
```

To get HTTP request logging into `/tmp/meth-express-pouchdb.log`:

```shell
$ DEBUG=1 yarn dev
```

## Deployments

**Remember to switch to the Meth team using `now switch`**

### Development

Deploy to https://zeit.co/now and note the deployed endpoint:

```shell
$ yarn deploy:dev
```

Enter the deployed endpoint URL into your [meth-browser](https://github.com/meth-browser/meth) app config (see the browser repo README for instructions).

### Production

The production deployment needs to connect to our hosted production CouchDB
instance. The following _secret_ variables thus need to be setup:

```shell
$ yarn now secret add couchdb_url <...URL...>
$ yarn now secret add couchdb_username <...username...>
$ yarn now secret add couchdb_password <...username...>
```

Once this is done, do:

```shell
$ yarn deploy:prod
```

Now alias to our domain name:

```shell
$ yarn now alias <...url to deployment...> meth.app
```

Once done the deployed backend should be accessible at https://meth.app
