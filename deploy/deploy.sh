#!/usr/bin/env bash

# @Author: Sergey Kuzmich
# @Date:   2017-10-15 00:47:04
# @Last Modified by:   Sergey Kuzmich
# @Last Modified time: 2017-10-16 00:03:05

#  1. Clone complete SVN repository to separate directory
svn co $SVN_REPOSITORY ../inline-spoilers-svn

#  2. Copy git repository contents to SNV trunk/ directory
cp -R ./* ../inline-spoilers-svn/trunk/

#  3. Go to trunk/
cd ../inline-spoilers-svn/trunk/

#  4. Move assets/ to SVN /assets/
mv ./assets/ ../assets/

#  5. Delete .git/
rm -rf .git/

#  6. Delete deploy/
rm -rf deploy/

#  7. Delete .travis.yml
rm -rf .travis.yml

#  8. Delete README.md
rm -rf README.md

#  9. Go to SVN home directory
cd ../

# 10. Send trunk/ updates
svn ci --message "Prepare $TRAVIS_TAG version" --username $SVN_USERNAME --password $SVN_PASSWORD --non-interactive

# 11. Create SVN tag directory
mkdir ./tags/$TRAVIS_TAG

# 12. Copy trunk/ to tags/{tag}/
cp -R ./trunk/* ./tags/$TRAVIS_TAG

# 13. Show tags
ls -l ./tags/

# 14. Commit SVN tag
svn ci --message "Release $TRAVIS_TAG" --username $SVN_USERNAME --password $SVN_PASSWORD --non-interactive
