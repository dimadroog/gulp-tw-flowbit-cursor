---
description: Do only what was requested; propose and get approval before any out-of-scope action.
alwaysApply: true
---

# Task Scope And User Approval

## Default

- Implement **only** what the user asked for in the current message, an approved plan, or an agreed task file (for example `TASK-NN` with explicit scope).
- **Do not** add drive-by refactors, extra pages, toolchain changes, `.cursor` edits, commits, or “while I’m here” fixes unless they are **required** to complete the agreed scope.

## Before acting outside scope

If you intend to do anything beyond the agreed prompt, plan, or task — including helpful but unrequested work — **stop**, state a short **proposal** (what, why, which files), and wait for **explicit approval**. Unapproved actions are undesirable.

## What is not “extra”

- Mandatory gates and checklists for the **current agreed implementation task** (for example `run-layout-task`, `npm run qa` when HTML changed) are not scope expansion.
- Read-only investigation reasonably needed to fulfill the request is allowed; prefer minimal reads.

## When unclear

- If scope is ambiguous, ask **before** writing or changing files.
- If regulations (`.cursor` rules/commands) appear to require work the user did not request, **do not silently expand** — reconcile with the user or record `not_applicable` with reason.
