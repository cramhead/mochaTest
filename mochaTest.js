if (Meteor.isClient) {
	// counter starts at 0
	Session.setDefault("counter", 0);

	Template.hello.helpers({
		counter: function() {
			return Session.get("counter");
		}
	});

	Template.hello.events({
		'click button': function() {
			// increment the counter when button is clicked
			Session.set("counter", Session.get("counter") + 1);
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function() {

		if (process.env.NODE_ENV === 'production') {
			console.log('production');

			var rootUrl = __meteor_runtime_config__.ROOT_URL;
			BrowserPolicy.content.allowConnectOrigin(rootUrl);
			BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));

		} else if (process.env.IS_MIRROR) {
			console.log('testing');

			var localUrl = 'http://localhost:3000';
			var mirrorUrl = 'http://localhost:5000';

			console.log("In development mode. Allowing all framing so that mocha-web can run for tests.");
			BrowserPolicy.content.allowOriginForAll("localhost:*");
			BrowserPolicy.content.allowConnectOrigin("ws://localhost:5000");
			BrowserPolicy.content.allowConnectOrigin("ws://localhost:3000");
			BrowserPolicy.content.allowFrameOrigin(mirrorUrl);
			//BrowserPolicy.framing.allowAll();
		}

	});
}
