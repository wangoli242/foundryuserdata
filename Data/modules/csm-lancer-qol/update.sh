#!/bin/sh

echo "dry_run: $dry_run"

## We can just get these from the module.json file
id=$( < module.json jq -r .id )
version=$( < module.json jq -r .version )
comp_min=$( < module.json jq -r .compatibility.minimum )
comp_ver=$( < module.json jq -r .compatibility.verified )
comp_max=$( < module.json jq -r .compatibility.maximum )

## These might can be automated later, but need to be built for now
manifest="https://gitlab.com/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}/-/releases/${version}/downloads/module.json"
echo "New manifest link: ${manifest}"
notes="https://gitlab.com/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}/-/tags/${version}"
echo "New notes link: ${notes}"

## Build the JSON data to post
if [ "$dry_run" = true ]; then
    json_data=$( jq -n \
        --arg id "$id" \
        --arg dryrun "$dry_run" \
        --arg version "$version" \
        --arg manifest "$manifest" \
        --arg notes "$notes" \
        --arg min "$comp_min" \
        --arg ver "$comp_ver" \
        --arg max "$comp_max" \
        '{id: $id, "dry-run": $dryrun, release: { version: $version, manifest: $manifest, notes: $notes, compatibility: { minimum: $min, verified: $ver, maximum: $max }}}' )
else
    json_data=$( jq -n \
        --arg id "$id" \
        --arg version "$version" \
        --arg manifest "$manifest" \
        --arg notes "$notes" \
        --arg min "$comp_min" \
        --arg ver "$comp_ver" \
        --arg max "$comp_max" \
        '{id: $id, release: { version: $version, manifest: $manifest, notes: $notes, compatibility: { minimum: $min, verified: $ver, maximum: $max }}}' )
fi

## Use curl to post the update
response=$( curl -s --header "Content-Type: application/json" \
    --header "Authorization: ${auth_token}" \
    --request POST \
    --data "$json_data" \
    https://api.foundryvtt.com/_api/packages/release_version )

## If the response is not a success, fail
if [ "$(echo "${response}" | jq -r .status)" = "success" ]; then
    echo "${response}" | jq .
else
    echo "${response}" | jq .
    exit 1
fi
