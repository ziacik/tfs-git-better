import * as api from "azure-devops-node-api";
// import * as TfvcApi from 'azure-devops-node-api/TfvcApi';
import * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces";
// import * as TfvcInterfaces from "azure-devops-node-api/interfaces/TfvcInterfaces";

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};


async function getWebApi(): Promise<api.WebApi> {
  const serverUrl = 'https://dev.azure.com/resconet';
  return await getApi(serverUrl);
}

export async function getApi(serverUrl: string): Promise<api.WebApi> {
  return new Promise<api.WebApi>(async (resolve, reject) => {
    try {
      let token = 'boztyweexiwkwirisbb33fnycpudvmfb3enz2ovcw6tllz2elkra';
      let authHandler = api.getPersonalAccessTokenHandler(token);
      let option = undefined;

      // The following sample is for testing proxy
      // option = {
      //     proxy: {
      //         proxyUrl: "http://127.0.0.1:8888"
      //         // proxyUsername: "1",
      //         // proxyPassword: "1",
      //         // proxyBypassHosts: [
      //         //     "github\.com"
      //         // ],
      //     },
      //     ignoreSslError: true
      // };

      // The following sample is for testing cert
      // option = {
      //     cert: {
      //         caFile: "E:\\certutil\\doctest\\ca2.pem",
      //         certFile: "E:\\certutil\\doctest\\client-cert2.pem",
      //         keyFile: "E:\\certutil\\doctest\\client-cert-key2.pem",
      //         passphrase: "test123",
      //     },
      // };

      let vsts: api.WebApi = new api.WebApi(serverUrl, authHandler, option);
      let connData: lim.ConnectionData = await vsts.connect();
      console.log(`Hello ${connData.authenticatedUser?.providerDisplayName}`);
      resolve(vsts);
    }
    catch (err) {
      reject(err);
    }
  });
}

async function bla() {
  const webApi = await getWebApi();
  const tfvc = await webApi.getTfvcApi();
  // const data: TfvcInterfaces.TfvcChangesetsRequestData  = {};
  // const branches = await tfvc.getBranches();
  for (let i = 1; i < 5; i++) {
    console.log(i);
    // const changesets = await tfvc.getChangesets(undefined, undefined, 100 * i);
    // console.log(changesets[0].comment);
    const changes = await tfvc.getChangesetChanges(i);
    console.log(changes);
    if (changes.length) {
      break;
    }
  }
}

bla().then(() => { }, console.error);

console.log('Hej?');
