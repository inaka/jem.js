# jem.js
Just Erlang Maps for Javascript

Jem.js encodes JavaScript objects in native erlang notation, after that, from Erlang you simply call ``erlang:binary_to_term(Binary)`` to obtain the same representation of a JSON you would usually get with jiffy.

Why would you use this? Two reasons, first, processing lots of JSON objects could get expensive on the server side, and second, this object representation is more concise, so less bandwidth will be used. In other words, you can save money on the hosting.