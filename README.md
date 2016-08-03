![Jem!](http://i.imgur.com/6apYjTN.gif)

Just Erlang Maps for Javascript

Jem.js encodes JavaScript objects in native erlang notation, so that, from Erlang you can simply call ``erlang:binary_to_term(Binary)`` to obtain the same representation of a JSON you would usually get from jiffy.

Why would you use this? Two reasons, first, processing lots of JSON objects could get expensive on the server side, and second, this object representation is more concise, so less bandwidth is required. In other words, you can save money on the hosting.
