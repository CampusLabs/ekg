BIN=node_modules/.bin/
MOCHA=$(BIN)mocha
WATCHY=$(BIN)watchy
COGS=$(BIN)cogs
TEST=$(MOCHA) --growl --colors --recursive
SERVER=node server
EKG_CONFIG?=config

dev:
	$(MAKE) -j redis server-w cogs-w test-w

redis:
	redis-server /usr/local/etc/redis.conf >> log/redis.log 2>&1

server:
	$(SERVER)

server-w:
	$(WATCHY) -w actions,models,server,lib,$(EKG_CONFIG) -vgs SIGQUIT -- $(SERVER)

server-prod:
	NODE_ENV=production $(WATCHY) -w $(EKG_CONFIG) -s SIGQUIT -- $(SERVER)

cogs:
	$(COGS) $(ARGS)

cogs-w:
	ARGS='-w client,models,views/jst' $(MAKE) cogs

test:
	NODE_ENV=test $(TEST)

test-w:
	NODE_ENV=test $(WATCHY) -w actions,models,server,test -s SIGQUIT -- $(TEST) > /dev/null

prod: cogs
	make -j redis server-prod

.PHONY: server test
