BIN=node_modules/.bin/
MOCHA=$(BIN)mocha
WATCHY=$(BIN)watchy
COGS=$(BIN)cogs
TEST=$(MOCHA) --growl --colors --recursive
SERVER=node server

dev:
	$(MAKE) -j redis server-w cogs-w test-w

redis:
	redis-server /usr/local/etc/redis.conf >> log/redis.log 2>&1

server:
	$(SERVER)

server-w:
	$(WATCHY) -w actions,models,server,lib -vgs SIGQUIT -- $(SERVER)

cogs:
	$(COGS) $(ARGS)

cogs-w:
	ARGS='-w client,models,views/jst' $(MAKE) cogs

test:
	NODE_ENV=test $(TEST)

test-w:
	NODE_ENV=test $(WATCHY) -w actions,models,server,test -s SIGQUIT -- $(TEST) > /dev/null

prod: cogs
	NODE_ENV=production $(SERVER)

.PHONY: server test
