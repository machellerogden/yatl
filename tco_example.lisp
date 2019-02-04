(def foo
    (fn [a b]
        (if (= a b)
            (print `done)
            (do
                (print a)
                (foo (+ a 1) b)))))
(foo 1 1000000)
