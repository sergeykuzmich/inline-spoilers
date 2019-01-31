#!/usr/bin/env bash

# @Author: Sergey Kuzmich
# @Date:   2017-10-15 00:47:04
# @Last Modified by:   Sergey Kuzmich
# @Last Modified time: 2017-10-17 13:53:03

#  1. Clone complete SVN repository to separate directory
svn co $SVN_REPOSITORY ../svn

#  2. Copy git repository contents to SNV trunk/ directory
cp -R ./* ../svn/trunk/

#  3. Go to trunk/
cd ../svn/trunk/

#  4. Move assets/ to SVN /assets/
mv ./assets/ ../assets/

#  5. Cleanup repository
#  5.1 Delete .git/
rm -rf .git/
#  5.2 Delete deploy/
rm -rf deploy/
#  5.3 Delete .travis.yml
rm -rf .travis.yml
#  5.4 Delete README.md
rm -rf README.md

#  6. Go to SVN home directory
cd ../

#. 7. Check for semver tag
semver_pattern="^[0-9]+\.[0-9]+\.[0-9]+$"
if [[ $TRAVIS_TAG =~ $semver_pattern ]]; then
  #  8. Draft new release
  #  8.1 Copy trunk/ to tags/{tag}/
  svn cp trunk tags/$TRAVIS_TAG
  #  8.2 Remove readme.txt from plugin archive
  rm -rf tags/$TRAVIS_TAG/readme.txt

  #  9. Set commit message
  SVN_COMMIT_MESSAGE="Release $TRAVIS_TAG"
else
  #  8. Just update trunk
  #  9. Set commit message
  SVN_COMMIT_MESSAGE="Update readme.txt"
fi

#  9. Commit SVN tag
svn ci  --message $SVN_COMMIT_MESSAGE \
        --username $SVN_USERNAME \
        --password $SVN_PASSWORD \
        --non-interactive
