fun f(n) = n+1;

let val a = 1 in
  let fun f(x) = x+a in
    let val a = 3 in
      f(4)
    end
  end
end;