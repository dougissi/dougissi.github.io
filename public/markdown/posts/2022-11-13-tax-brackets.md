---
layout: post_with_embedding
title: Is It Bad to Move to a Higher Tax Bracket?
tags: [Visualization]
embedding_path: /assets/tax_brackets/Tax_Owed_Across_Tax_Brackets.html
image:
  path: /assets/tax_brackets/next-tax-bracket_2400x1258.jpg
  width: 2400
  height: 1258
---

![Instagram NPR Tax Brackets Post](embedding/tax-brackets-instagram-npr-post)

## Motivation
I have been filing my taxes by hand (read: not with Turbo Tax) since 2018. What can I say? I like to live life on the edge. But don't be too impressed: my mom Merry has been a professional tax preparer for essentially as long as I've been alive, so I have a really great helper for the confusing stuff. She's gotten so good that she's become an expert in working with US citizens who live outside of the country, which can get very spicy from a tax perspective. (SPOILER: there are many situations in which you will need to pay taxes to the US _and_ your country of residence.) If you are in need of any assistance, feel free to check out her website, [merrynumbers.com](https://merrynumbers.com/).

Anyway, a concept that has been foggy in my mind over the past few years has to do with **tax brackets**. I've heard well-off people mention things like, "When you're in our tax bracket, more than a third of your income goes to taxes." Wow. My natural inclination has been to think, "Well, maybe it's not so bad that I'm not in a higher tax bracket then."

And when my wife came across the [NPR Instagram post embedded above](#instagram-embed-0), I knew I had to finally get to the bottom of it. Thankfully, I can likewise conclude that **it is NOT bad to move to a higher tax bracket**!

In the end, a sentiment that I learned from my mom has continued to ring true: never try to make _less_ money just to avoid paying _more_ taxes.

## Caveats
For this investigation, we're going to limit ourselves to just federal tax obligations and ignore a person's state tax obligations. The federal tax obligations are typically the bulk anyway. 

Tax codes change from year to year, so this investigation uses the 2021 codes, which are the most recent as of the time of this writing.

## Taxable Income
For most US taxpayers, the primary federal IRS form is [1040](https://www.irs.gov/pub/irs-pdf/f1040.pdf), and the IRS provides with very detailed [instructions](https://www.irs.gov/pub/irs-pdf/i1040gi.pdf).

In _very_ simplified terms, the IRS 1040 form and its instructions guide you through:
* combining all of your income from the previous tax year, perhaps from various sources. We'll call this `A`.
* calculating all of your deductions -- everything you're allowed to subtract from `A` because you shouldn't be taxed on it. We'll call this `B`.
* With `A` and `B` calculated, we can calculate your **Taxable Income** as `A` - `B`. Said another way, this is the amount of your income from the previous tax year _that you need to pay taxes on_.

With your **Taxable Income** calculated, it's now time to figure out how much tax you actually need to pay in taxes. From the perspective of the instructions, the method for determining your tax obligation is contingent on whether your taxable income is more or less than $100,000.

## Taxable Income Less Than $100,000
For those who's taxable income is less than $100,000, you can look up how much tax you owe in the provided Tax Table. Every $50 increment is listed (all 2,000 increments), so you just have to find the one that matches your taxable income.

For example, suppose your taxable income came to $60,872. You can look up your tax obligation in the table at the row for taxable incomes between $60,850 and $60,900. If you are filing as a single (non-married) person, your tax obligation would be $9,141, as shown below.

![2021 Tax Table - Single](/assets/tax_brackets/2021_tax_table.png)

## Taxable Income of $100,000 or More
If your taxable income is $100,000 or more, then you have to calculate your own final tax number, and it varies slightly for different levels of taxable income. For example, for single people, there are just four categories:
  * between $100,000 and $164,925
  * between $164,925 and $209,425
  * between $209,425 and $523,600
  * between $523,600 or more.

For each category, the IRS provides a number to multiply your taxable income by, then another number to subtract from that multiplication, and the final number after the subtaction is what you owe in taxes. 

Here is a screenshot from the instructions describing these categories.

![2021 Tax Brackets - Single](/assets/tax_brackets/2021_tax_calc_single.png)

For example, if you are filing as a single person and your taxable income was $200,000, then the resulting tax obligation is $200,000 * 0.32 - $19,173 = $44,827, per the second row of the table above.

These categories, as well as the associated numbers to multiply and subract, vary for married couples filing jointly, married couples filing separately, and non-married heads of households, but the concept remains the same.

When people refer to "tax brackets," typically it's for these higher taxable income categories.

## So what happens to your tax obligation as you make more money?
While the IRS 1040 form instructions are very thorough, they don't give (as far as I know) any general principles or visuals on how tax obligations change for different levels of taxable income. So I decided to synthesize the information we've discussed so far and condense it into graphs for easy digestion.

Here are the tax obligations by different levels of taxable income, with the red dotted lines representing the various tax brackets for single people.

![2021 Taxable Income vs Taxes Owed - Single](/assets/tax_brackets/2021_taxable_income_vs_taxes_owed_sing.png)

Below is the same idea but for those with filing status "married filing jointly." Notice that there is an additional bracket.

![2021 Taxable Income vs Taxes Owed - Married Filing Jointly](/assets/tax_brackets/2021_taxable_income_vs_taxes_owed_mfj.png)

## Casual Observations
1. As your taxable income crosses into the next higher bracket, there are no big "jumps." In other words, if you end up making a bit more money from one year to the next and happen to cross from one bracket into the next higher one, your tax obligation will only be incrementally higher. This is good news!
2. There is a tax advantage for being married. If you compare the two graphs above closely, you see that for the same taxable incomes, the tax obligation is less for married couples filing jointly compared to single people.

## Python Code to Produce Graphs
Embedded below is the Python 3 code in a Jupyter Notebook that I used to produce these graphs. Navigate <a href="{{ page.embedding_path }}" target="_blank">here</a> for a full-page view.

Enjoy!
