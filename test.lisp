(load "./core.lisp")

(print (= (contains? `(1 2) 1)
          true))

(print (= (get `(1 2) 1)
          2))

(print (= (.stringify js/JSON (set `(1 2) 1 3))
          (.stringify js/JSON `(1 3))))

(print (= (first `(3 2 1))
          3))

(print (= (last `(3 2 1))
          1))

(print (= (count `(3 2 1))
          3))

(print (= (empty? `(3 2 1))
          false))

(print (= (empty? `())
          true))

(print (= (slice `(1 2 3) 2)
          3))

(print (= (.stringify js/JSON (rest `(1 2 3)))
          (.stringify js/JSON `(2 3))))

(print (= (.stringify js/JSON (cons 1 `(2 3)))
          (.stringify js/JSON `(1 2 3))))

(print (= (when
            (= 1 1)
            2)
          2))

(print (= (when
            (= 1 2)
            2)
          nil))
