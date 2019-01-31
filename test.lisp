(load "./core.lisp")

(print "contains? - returns true if given list contains given value, else nil")
(print (= (contains? `(1 2) 1)
          true))

(print "get - returns element from given list at given index")
(print (= (get `(1 2) 1)
          2))

(print "set - sets given value at a given index in a given list")
(print (= (.stringify js/JSON (set `(1 2) 1 3))
          (.stringify js/JSON `(1 3))))

(print "first - returns first element in a given list")
(print (= (first `(3 2 1))
          3))

(print "last - returns last element in a given list")
(print (= (last `(3 2 1))
          1))

(print "count - returns number of elements in a given list")
(print (= (count `(3 2 1))
          3))

(print "empty - returns false if given list has length")
(print (= (empty? `(3 2 1))
          false))

(print "empty - returns true if given list is empty")
(print (= (empty? `())
          true))

(print "slice - slices") ; TODO
(print (= (slice `(1 2 3) 2)
          3))

(print "rest - returns new list with first element removed")
(print (= (.stringify js/JSON (rest `(1 2 3)))
          (.stringify js/JSON `(2 3))))

(print "cons - returns new list with given value added to beginning") ; TODO
(print (= (.stringify js/JSON (cons 1 `(2 3)))
          (.stringify js/JSON `(1 2 3))))

(print "when - evaluates given exprs when given condition evaluates to true")
(print (= (when
            (= 1 1)
            2)
          2))

(print "when - does not evaluate given exprs when given condition evaluates to false")
(print (= (when
            (= 1 2)
            2)
          nil))
