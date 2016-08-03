<img src="http://i.imgur.com/6apYjTN.gif" align="right" style="float:right" height="300" />

## Jem.js

Just Erlang Maps for Javascript

## Why Jem.js?

Using JSON to communicate with an erlang server requires using resources to parse it and takes up more bandwidth than needed. Instead of sending plaintext JSON, you can use Jem.js to encode your JavaScript objects in the native Erlang binary format, so that, from the server, all that's needed is calling ``erlang:binary_to_term(Binary)`` to obtain the same representation of a JSON you would usually get from jiffy.

So why would you use this? You can save money on the hosting.

## How to use it?

The 2 functions Jem.js exposes are pretty straight forward and you can find an example in the examples directory.

From the erlang side it's just as simple, all you need to do is replace ``jiffy:decode/1`` and ``jiffy:encode/1`` with ``binary_to_term/1`` and ``term_to_binary/1``.

For example, lets say we have this pretty straight forward Cowboy endpoint:

``` erlang
handle_post(Req, State) ->
  {ok, Body, Req1} = cowboy_req:body(Req),
  Decoded = jiffy:decode(Body, [return_maps]),
  Reply = do_whatever(Decoded),
  {jiffy:encode(Reply), Req1, State}.
```

With jem.js on the client, we could instead do this:

``` erlang
handle_post(Req, State) ->
  {ok, Body, Req1} = cowboy_req:body(Req),
  Decoded = erlang:binary_to_term(Body),
  Reply = do_whatever(Decoded),
  {erlang:term_to_binary(Reply), Req1, State}.
```

(just remember you are not accepting ``application/json`` but ``application/erlang`` on the content types)

## Contact Us
For **questions** or **general comments** regarding the use of this library,
please use our public [hipchat room](http://inaka.net/hipchat).

If you find any **bugs** or have a **problem** while using this library, please
[open an issue](https://github.com/inaka/jem.js/issues/new) in this repo
(or a pull request :)).

And you can check all of our open-source projects at [inaka.github.io](http://inaka.github.io).
