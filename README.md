# YATL

> Yet Another Toy Lisp

## Background

YATL is a small project I wrote while learning Clojure. It's a very simplistic Lisp interpreter that it directly inspired by [Joel Martin](https://github.com/kanaka)'s [miniMAL](https://github.com/kanaka/miniMAL).

I make no claim to originality. YATL is a miniMAL re-write paired up with a simple reader implementation I wrote which allows for using a more lisp-like data syntax.

As I read through the instructions for Joel's [MAL](https://github.com/kanaka/mal) repo, I found I was having trouble following along until I found miniMAL which was a MAL implementation in JavaScript.

I proceeded the re-write miniMAL one piece at a time until I fully understood everything it was doing—YATL is the result. Next, I wrote a simple data reader in order to provide an option for using a Lisp-like syntax instead of JSON.

Writing YATL has been extremely helpful in further my understanding of Clojure and Lisps in general. Within the [mal directory in this project](https://github.com/machellerogden/yatl/tree/master/mal), I've broken down the code into even more granual "steps" than what Joel originally outlined in hopes it might help others better understand the intention of the code.


## Usage

Interesting in trying it out? Start by running the tests.

```sh
./yatl test.lisp
```

```sh
YATL_JSON=true ./yatl test.json
```

Take a look at [core.json](https://github.com/machellerogden/yatl/blob/master/core.json) and [core.lisp](https://github.com/machellerogden/yatl/blob/master/core.lisp) for some code examples.


## License

MIT
