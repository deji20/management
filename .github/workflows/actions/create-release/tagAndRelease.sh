OPTIND=1

echo "Fetching tags"
git fetch --all --tag
echo "git setting Identity"
git config user.name "github action"
git config user.email "dev@movinn.dk"

version=($((git describe --tags --abbrev=0 || echo "1.0.0") | grep -Eo "[0-9]+"))
major=${version[0]}
minor=${version[1]}
patch=${version[2]}

update="patch"
git log -1 --pretty=%B | grep -q "{{major}}" && update="major"; 
git log -1 --pretty=%B | grep -q "{{minor}}" && update="minor"; 

case $update in
    "major") 
        echo "major update"
        major=$(($major + 1))
        minor=0
        patch=0
        ;;
    "minor") 
        echo "minor update"
        minor=$(($minor + 1))
        patch=0
        ;;
    "patch") 
        echo "patch update"
        patch=$(($patch + 1))
        ;;
esac

echo "Old Version: " $(git describe --tags --abbrev=0)
newVersion=$(echo "$major.$minor.$patch")
commitMessage=$(git log -1 --pretty=%B)
#git tag -a "$major.$minor.$patch" -m "$commitMessage"
echo "New Version: " $newVersion


#git push --tags
echo "::set-output name=version::$newVersion"