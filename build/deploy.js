import fetch from 'isomorphic-fetch';
import { execSync } from 'child_process';

console.log('Deploying to now...');
execSync('now deploy');
(async () => {
    const baseURL = 'https://api.zeit.co';
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer G1IxjO2FDhFVlPCb4FF4cBwM'
    };
    console.log('Getting old aliases & deployments...');
    const [deploys, aliases] = await Promise.all([
        fetch(`${baseURL}/now/deployments`, { headers }),
        fetch(`${baseURL}/now/aliases`, { headers })
    ]);
    console.log('Updating...');
    const { aliases: oldAliases } = await aliases.json();
    const { deployments: oldDeploys } = await deploys.json();
    const aliasToDelete = oldAliases.filter(a => a.alias === 'social.react.sh')[0];
    const deploymentToDelete = oldDeploys
        .filter(d => d.name === 'letters-social')
        .find(d => aliasToDelete.deployment.id === d.uid);
    const deploymentToAlias = oldDeploys
        .filter(
            d => d.name === 'letters-social' && d.state !== 'BUILD_ERROR' && d.state !== 'DEPLOYING'
        )
        .sort((a, b) => a.created < b.created)
        .shift();
    if (deploymentToDelete.uid === deploymentToAlias.uid) {
        console.log('no new deploy');
        return process.exit(0);
    }
    console.log('Updating alias with new deployment ID...');
    await fetch(`${baseURL}/now/deployments/${deploymentToAlias.uid}/aliases`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            alias: 'social.react.sh'
        })
    });
    console.log('Deleting old deployments..');
    const deploymentsToDelete = oldDeploys.filter(
        d => d.name === 'letters-social' && d.uid !== deploymentToAlias
    );
    await Promise.all(
        deploymentsToDelete.map(d => {
            return fetch(`${baseURL}/now/deployments/${d.uid}/aliases`, {
                method: 'DELETE',
                headers,
                body: JSON.stringify({
                    alias: 'social.react.sh'
                })
            });
        })
    );
})();
