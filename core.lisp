(def list (fn [& a] a))

(def list? (fn [a]
  (.isArray js/Array a)))

(def contains? (fn [a b]
  (.hasOwnProperty a b)))

(def get (fn [a b]
  (if (contains? a b)
    ($ a b)
    nil)))

(def set (fn [a b c]
  (do
    ($ a b c)
    a)))

(def nth get)

(def first (fn [a]
  (if (> ($ a `length) 0)
    (nth a 0)
    nil)))

(def last (fn [a]
  (nth a (- ($ a `length) 1))))

(def count (fn [a]
  ($ a `length)))

(def empty? (fn [a]
  (if (list? a)
    (= 0 (get a `length))
    (= a nil))))

(def slice (fn [a b & end]
  (.slice a b
    (if (> (get end `length) 0)
      (get end 0)
      (get a `length)))))

(def rest (fn [a] (slice a 1)))

(def when ~(fn
  [test & body]
  (list `if test (cons `do body))))
