import { API_BASE_URL } from "../config";

type EnvironmentResponseType = {
  "instance_count": null | number,
  "session_storage": "redis" | "file" | string,
  "type": "production" | "staging" | "development" | string
}

export const ENVIRONMENT_PATH = `environment`
export const ENVIRONMENT_API_URI = `${API_BASE_URL}/${ENVIRONMENT_PATH}`;

export const fetchEnvironment = async (): Promise<EnvironmentResponseType> => {

  // fetch(ENVIRONMENT_API_URI)
  //   .then( response => response.json() )
  //   .then( data => console.log(data) )
  // var opts = {
  //   "mode": "no-cors",
  //   headers: {
  //     mode: "no-cors",
  //     // 'Access-Control-Allow-Origin': 'http://127.0.0.1:30000'
  //   }
  // }
  const response = await fetch(ENVIRONMENT_API_URI);
  // tslint:disable:no-console
  // console.log(response.json());
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to fetch environment');
  }
  // console.log(response.json());
  const data = await response.json();

  return data as EnvironmentResponseType;
};


// curl 'http://127.0.0.1:30000/api/v1/environment' \
//   -H 'Accept: */*' \
//   -H 'Accept-Language: en-US,en;q=0.9' \
//   -H 'Connection: keep-alive' \
//   -H 'Referer: http://localhost:3000/' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Sec-Fetch-Mode: no-cors' \
//   -H 'Sec-Fetch-Site: cross-site' \
//   -H 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36' \
//   -H 'sec-ch-ua: "Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"' \
//   -H 'sec-ch-ua-mobile: ?1' \
//   -H 'sec-ch-ua-platform: "Android"' \
//   --compressed
