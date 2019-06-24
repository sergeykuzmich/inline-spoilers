PHPCS_DIR=/tmp/phpcs
PHPCS_REPO=https://github.com/squizlabs/PHP_CodeSniffer.git
WPCS_DIR=/tmp/sniffs
WPCS_REPO=https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git


lint: setup_wpcs
	$(PHPCS_DIR)/bin/phpcs --standard=WordPress-Extra --extensions=php .

csfix: setup_wpcs
	$(PHPCS_DIR)/bin/phpcbf --standard=WordPress-Extra --extensions=php .

get_phpcs:
	if [ ! -d $(PHPCS_DIR) ]; then git clone -b master $(PHPCS_REPO) $(PHPCS_DIR) --depth 5; fi

get_wpcs:
	if [ ! -d $(WPCS_DIR) ]; then git clone -b master $(WPCS_REPO) $(WPCS_DIR) --depth 5; fi

setup_wpcs: get_phpcs get_wpcs
	$(PHPCS_DIR)/bin/phpcs --config-set installed_paths $(WPCS_DIR)
