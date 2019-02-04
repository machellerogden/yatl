; TODO: make this work...

(def odd-huh
  (fn [n]
    (if (= 0 n)
        false
        (even-huh (- 1 n)))))

(def even-huh
  (fn [n]
    (if (= 0 n)
        true
        (odd-huh (- 1 n)))))
