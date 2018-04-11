# Predix Kits Cloud App

This application is used with Predix hardware kits, to show real sensor data in a cloud application.
In addition, the Express server acts as a proxy between the actual kit and the kit-service.

## Getting Started

### Get the source code
Git clone this repository.

### Install tools
If you don't have them already, you'll need node, bower and gulp to be installed globally on your machine.  

1. Install [node](https://nodejs.org/en/download/).  This includes npm - the node package manager.  
2. Install [bower](https://bower.io/) globally `npm install bower -g`  
3. Install [gulp](http://gulpjs.com/) globally `npm install gulp-cli -g`  

### Install the dependencies
Change directory into the new project you just cloned, then install dependencies.
```
npm install
bower install
```
## Running the app locally
The default gulp task will start a local web server.  Just run this command:
```
gulp
```
Browse to http://localhost:5000.
Initially, the app will use mock data for the views service, asset service, and time series service.
Later you can connect your app to real instances of these services.

## Running in Predix Cloud
With a few commands you can build a distribution version of the app, and deploy it to the cloud.

### Create a distribution version
Use gulp to create a distribution version of your app, which contains vulcanized files for more efficient serving.
You will need to run this command every time before you deploy to the Cloud.
```
gulp dist
```


## Push to the Cloud

### Pre-Requisites
Pushing (deploying) to a cloud environment requires knowledge of the commands involved and a valid user account with the environment.  GE uses Cloud Foundry for its cloud platform.  For information on Cloud Foundry, refer to this [link](http://docs.cloudfoundry.org/cf-cli/index.html).

### Steps
The simplest way to push the Starter application to a cloud environment is by modifying the default manifest file (manifest.yml) and using the **cf push** command, as follows:

1. Update manifest.yml

	Change the name field in your manifest.yml.  
	Uncomment the services section, and change the names to match your service instances.
	Uncomment the clientId and base64ClientCredential environment variables and enter the correct values for your UAA client.
	```
	---
	applications:
	  - name: my-predix-starter
	    memory: 64M
	    buildpack: nodejs_buildpack
	    command: node server/app.js
	#services:
	 # - <your-name>-secure-uaa-instance
	 # - <your-name>-timeseries-instance
	 # - <your-name>-asset-instance
	env:
	    node_env: cloud
	    uaa_service_label : predix-uaa
	    # Add these values for authentication in the cloud
	    #clientId: {Enter client ID, e.g. app-client-id, and place it here}
	    #base64ClientCredential: dWFhLWNsaWVudC1pZDp1YWEtY2xpZW50LWlkLXNlY3JldA==
	```

2. Push to the cloud.

	```
	cf push
	```

3. Access the cloud deployment of your Starter application

  The output of the **cf push** command includes the URL to which your application was deployed.  Below is an example:

	```
	Showing health and status for app my-predix-starter in org my-org / space dev as developer@gmail.com...
	OK

	requested state: started
	instances: 1/1
	usage: 128M x 1 instances
	urls: my-predix-starter.run.aws-usw02-pr.ice.predix.io
	last uploaded: Mon Apr 17 18:35:03 UTC 2017
	stack: cflinuxfs2
	buildpack: nodejs_buildpack

		state     since                    cpu    memory          disk          details
	#0   running   2017-04-17 11:35:40 AM   0.0%   63.5M of 128M   90.9M of 1G
	```  

  Access your Starter application by adding "https://" to the beginning of the URL, and loading that URL in a web browser.

## Support and Further Information

Ask questions and file tickets on <a href="https://www.predix.io/community" target="_blank">https://www.predix.io/community</a>.

# Copyright
Copyright &copy; 2015, 2016, 2017, 2018 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.

[![Analytics](https://ga-beacon.appspot.com/UA-82773213-1/kit-cloud-app/readme?pixel)](https://github.com/PredixDev)
