--- 
heading: Custom logger
category: reference
---

Elsewhere use a simple logging system that writes to Node's console. You can replace the logger with your own, for example, to store warnings and errors in a database or log file. To add your own custom logger, all you need to do is provide an object contain the following interface:

	{
	    function info(message) { // add code to pass on massage }
	    function log (message) { // add code to pass on massage }
	    function warn  (message) { // add code to pass on massage }
	    function error (message) { // add code to pass on massage }
	}

and then add this interface to the 'logger' property of the options object passed into the `graph()` method.