var admin = require('firebase-admin');


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://web-test-5a8d2.firebaseio.com",
	credential: admin.credential.cert({
	  type: "service_account",
	  project_id: "web-test-5a8d2",
	  private_key_id: "481854e0db9338cc7182d20be9208838a022b232",
	  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNJd79Fp/j/Yim\nDIQyo5Rn4RbRiyueezMN/5libkIkRsOf/sahwEcK451FLSt4gewE0e9p+VqGKWXx\n8o281EF1EpKn+afl4x1AQyhLFS3uD+xEqQwU1ngRSLfmfVo3MQEQdIPCYfalMo1a\n2J100GvFLLqJ/hQT8WPH4QZOL6DFHRDuROQBUEjyAaMFdxehIUZHL6UzDfa+Qdzz\nFGpU/STaQQzZbucVxPhsDOgx540akoNq2QbnMyFFhDn8qSZMq/n+9UA1A6NbIzX/\nhKk4sJZ4ScFMfVyzIwv7IZdZW3BINEohlBY8QKHQm1zI8hGztD0OZSUtl4AgfzMC\nCuBevL4rAgMBAAECggEAVKM3xSY08Ey1OIC4d+X6QANjNS+cXuXIUhGumCgSPMI/\nSn7EN47LIKh4xcYVhcHgfLqacpfwa6Kfzzr5lDrkCKeRfyDmztctRcqPUK7bxLio\nC0nNVLmJTuQ4Dy2Pb27V2BKiG6vsJQreu+jbyYqFtBM4oN8FLJcuShRCVDadN0UC\nCDhhdE/KrLPd6w5lMC8YX2Nh3BiKEU+4auuWLYzNnj/rgs9j/P9f9EbtkzMA8VqK\nwI5dvUgcjGzPRvQhYH/BN8ZEu1bCh9x3t5ZzC1lWzxa5ippX4n4DDko2/mHFZtSw\nnSss9sB52qvMb7N0WWXEispcHkqoG+lAQWHrCLchRQKBgQDp/B1i6gN1Hd8pZMgR\n5R8m9NgslkfRbor3YlvF36faMDD48z4rcgFhLh843i/gfV8p9ZsDbBio+5kkz7sN\nGNto9pbJDGFdqhJAyFATYCUDbZ5Kl3M6Epk9QvWguLGnO3K5Yuhw3OhgUZO8A3h9\nHuJtq6xcuQ6+hsTIivkmku2S5wKBgQDgcyzhY1XLNBBY9r/YPXE/XIgT0QTvk8gh\niyxIjSUzwsFDh8k7HOh7tSQTOPSap5eCnUbHNNCEX9B4ljlv0HOlTakZ+7oxvwgS\nSVvS+lGQBHCFAWZi+4bOQeK8P0JE7FY929RB9GBGM02uOul8ma9chjalgLKtOsBf\n2HNU/ArWHQKBgCq297Zi+habSW4JE+0QYst9zyj0lk/JWl0m+5H37nCKc6Y+4Y6U\n1WOkQ9bh2OOmf4TtbUsGpMnUhHSP55nQe92Bhq1VMUEkFwj0iInA94DUthzv4P0t\nAASLAMRCc0wQMjVdtQlFirZqrgmYqJpO1Q8oU+LpdaOafroNhMZh9DTpAoGBALq+\nOSYhnt0dqUhLrFx+6n1cQH+0VZX7b/SwtZx7iutg66mDDWNYbvmWQbiYl7MhI0by\nElRl1eN9UJcz7f/hAIcVcU+ECGuhVFbaoEKOMFRRzUhsXMKYIZX0bXBQdZOgyzRW\ndWiWqY9e2g/PRjp8J9IkfM0AoijNDAfysCqSNXXlAoGBANKUSaNZ+rlVy7gsalw1\nGBP7HsVXTE1CVJEQtJ35RKAzoZTWQIuuDn8mz+PV7E8b1MviYWVQz2XH00/l6o/W\nej1g/Kf/aRCYUbXjiMNLNc/p8G/unK7AZ/AkGg1jZlzKUoAVCgQV8jo7A34LNngp\n9CVrpdyQVmi96ATvGtcKk3sC\n-----END PRIVATE KEY-----\n",
	  client_email: "firebase-adminsdk-idxvb@web-test-5a8d2.iam.gserviceaccount.com",
	  client_id: "118309735325421834059",
	  auth_uri: "https://accounts.google.com/o/oauth2/auth",
	  token_uri: "https://oauth2.googleapis.com/token",
	  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-idxvb%40web-test-5a8d2.iam.gserviceaccount.com"
	 })
});

 console.log("intial successfull");



const registrationTokens = [
  // 'fnsYQXqnfEMgjrn0tWDi6D:APA91bFm7UCdbD_lmN6N-BadW2LJQ-W0XHhSL-WHWqYxOLXgSYoMJn3A5USbiN4PlE83W2srUtNKAEmBjSqV4wKZ0qpWG7MREGoo0TDBy5TOXZXEAKQ8cPYbdxiGsyB293nbm0_EVbz3',
  // 'f26aaTIVV-g:APA91bFZbjp4VmSpBnQCAY49NrXzlxNBKLwklTA1yX6sYZpkRi8rihnXJ6lo7Ni6VZjCpPNzzFPrDQlBMH-hSGc8B2oNz2aTuJbEqCvmKdfAae_zJPLK0IjiB2TPAhPL72Tq89keuffP',
  // 'c4IV2n8fm6A:APA91bHIkrVaYXhQT8Qmq8vYSwV6HFHM650zhowM5jAChYLW9aE4pXY_cRMJRKWOCUcjZsg4mOxJfUNdKnsK8UsGTXYFyo22kT3kmTZQJwCmxuq1mhQ3_f0MFSB7ZNqFMsZxJp_sWCJ0',
  'fX_lHIJlwEGYibPrS465Bx:APA91bFFODXhZJB63ZYNe8boYYC-rr07ZVG77c-JIYkXr7KH9wk1Wo6K294S351Rio-u5tKewe-HrvalvXoWTuodNl3ybXI12DReYAA59PFFrnEBEl-Zwi0j19gzBIkbgZx2Er4E-gSn'
];
// These registration tokens come from the client FCM SDKs.

console.log("start send information");
const message = {
  // "data": {score: '850', time: '2:45'},
  "tokens": registrationTokens,
  
  "notification": {
    		"title":"helllo",
    		"body":"book",},
  "android": {
			  "priority": "HIGH",
			  "restricted_package_name": "com.xyx.bookmate",
			},
  
  // "apns": {
  		// "headers": {
   	// 		"apns-priority":"10"},
  		// "payload": {
    // 		"aps" : {
    //   			"alert" : {
    //      			"title" : "Game Request",
    //      			"subtitle" : "Five Card Draw",
    //      			"body" : "Bob wants to play poker",
    //   						},
   	// 				}
  		// 		},
  		// },
         }



console.log("fail tokens");
admin.messaging().sendMulticast(message)
  .then((response) => {
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(registrationTokens[idx]);
        }
      });
      console.log('List of tokens that caused failures: ' + failedTokens);
    }
  });