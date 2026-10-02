"""Reproduces every number shown in Ep 16. Run: python3 calc.py
Illustrative cart, Pay in 4 as the CFPB describes it: 25% at checkout, then three more every two weeks (six weeks)."""

CART = [('jacket', 200), ('earbuds', 120), ('shoes', 80)]

per = {name: price / 4 for name, price in CART}
total = sum(p for _, p in CART)
dates = ['today', 'week 2', 'week 4', 'week 6']
due = {d: sum(per.values()) for d in dates}
payments = len(CART) * 4

for name, price in CART:
    print(f'{name:8} ${price:>4}  ->  4 x ${per[name]:.0f}')
print(f'payments : {payments} in 6 weeks')
for d in dates:
    print(f'{d:8} : ${due[d]:.0f} due')
print(f'total    : ${total} in 6 weeks')
print(f'one plan at a time (jacket only): ${per["jacket"]:.0f} on each date')
