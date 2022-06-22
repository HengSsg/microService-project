import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests

export const requests = new Counter('http_reqs');

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
  stages: [
    { target: 20, duration: '20s' }
  ],
  thresholds: {
    requests: ['count < 100'],
  },
};
let cnt = 1

export default function () {
  // our HTTP request, note that we are saving the response to res, which can be accessed later
  // cnt++;]
  const payload = {"input":1, "step": cnt, "tag": "1"}; // cnt 가 기록되도록 추가 하였다 
  cnt++;
  const headers = {
    'Content-Type': 'application/json',
    'dataType': 'json'
  };
  const res = http.request('POST', 'https://5deiaao4hk.execute-api.ap-northeast-2.amazonaws.com/produce',
  JSON.stringify(payload),  {
    headers: headers,
  });
  console.log(JSON.stringify(payload))
  sleep(0.1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'response body': (r) => r.body.indexOf('{"message":"Message accepted!"}') !== -1,
  });
}
