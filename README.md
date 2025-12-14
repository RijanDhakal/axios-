### Costume HTTP client ( similar to axios )
---
despite the fact that axios is build on the top of node js internal api fetching and xml requests (note : Axios was build before fetch existed in JS). I decided to build a fetch wrapper but hvaing the features and work flow similar to axios. The features i have been able to add here is: <br >

1. Decent error handling
2. Timeout functionality : Implemented using the AbortController() in the fetch
3. Interceptors
4. Time-duration take in the req-res cycle (very good for developers)
5. costume headers 

I am planning to pulish it into NPM packages.

## FINAL VERDICT

I started this project to make engineering thinking more clear and visionary. 
Along this journey of making a HTTP client , | I myself critisize it as a fetch wrapper |. I got to learn how complex it is to build systems.
The actual difference between Building systems and just using them and make pixels working or data flow. 

The OS task-schelduling knowledge helped me to build a queue processing for interceptor. Although it was a small code block but I implemented a mini task schelduling algo. I wanted to have a processID and cache them but I was uncessary. The more things i think i can implement here is everything. 

Thank you ! 