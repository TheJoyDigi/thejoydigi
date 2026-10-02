"""Reproduces every number shown in Ep 14. Run: python3 calc.py"""

BAL, APR = 1000.00, 0.24
FLOOR, PCT = 25.00, 0.01


def payoff(bal, pay_fn):
    months, interest_total, first = 0, 0.0, None
    while bal > 0.005 and months < 2000:
        interest = round(bal * APR / 12, 2)
        pay = min(pay_fn(bal, interest), bal + interest)
        if first is None:
            first = (interest, pay, round(bal + interest - pay, 2))
        interest_total += interest
        bal = round(bal + interest - pay, 2)
        months += 1
    return months, round(interest_total, 2), first


minimum = lambda bal, interest: max(FLOOR, interest + bal * PCT)
flat50 = lambda bal, interest: 50.0

m1, i1, f1 = payoff(BAL, minimum)
m2, i2, f2 = payoff(BAL, flat50)

print(f"first month  : interest ${f1[0]:.2f}, payment ${f1[1]:.2f}, new balance ${f1[2]:.2f}")
print(f"minimum only : {m1} months ({m1/12:.1f} years), interest ${i1:.2f}, total ${BAL+i1:.2f}")
print(f"flat $50     : {m2} months, interest ${i2:.2f}, total ${BAL+i2:.2f}")
print(f"difference   : {m1-m2} months ({(m1-m2)/12:.0f} years), ${i1-i2:.2f} saved")

m3, i3, _ = payoff(BAL, lambda bal, interest: minimum(bal, interest) + 20)
print(f"minimum + $20 (not what we show): {m3} months, interest ${i3:.2f}")
# the minimum itself shrinks as the balance falls: first payment vs the floor
print(f"minimum payment: ${minimum(1000, 20):.2f} at the start, falls to the ${FLOOR:.0f} floor")
