import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests

export const requests = new Counter('http_reqs');

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
  stages: [
    { target: 20, duration: '20s' },
    { target: 15, duration: '20s' },
    { target: 0, duration: '20s' },
  ],
  thresholds: {
    requests: ['count < 100'],
  },
};


export default function () {
  // our HTTP request, note that we are saving the response to res, which can be accessed later
  const payload = {"input":1};
  const headers = {
    'Content-Type': 'application/json',
    'dataType': 'json'
  };
  const res = http.request('POST', 'https://s8zaq2jwg0.execute-api.ap-northeast-2.amazonaws.com/produce', // 주소 바꾸세요
  JSON.stringify(payload),  {
    headers: headers,
  });
  console.log(JSON.stringify(payload))
  sleep(0.1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200, // 기대한 HTTP 응답코드인지 확인합니다. 
    'response body': (r) => r.body.indexOf('{"message":"Message accepted!"}') !== -1,  // 기대한 응답인지 확인합니다. 
  });
}
