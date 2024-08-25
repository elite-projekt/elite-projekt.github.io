---
sidebar_position: 10
---

# Known Issues

## subprocess

Several messages occurred when checking the Python code with the [Bandit
tool](https://github.com/PyCQA/bandit). Bandit is a tool to find common
security vulnerabilities in Python source code. Currently, the error
messages are ignored by `# nosec`, but they are listed here for
documentation purposes, as they need to be watched.

How to use the `subprocess` package correctly at the moment is described
in [a
guideline](https://security.openstack.org/guidelines/dg_use-subprocess-securely.html).

### Blacklisted import

One of these error messages is [B404:
import_subprocess](https://bandit.readthedocs.io/en/latest/blacklists/blacklist_imports.html#b404-import-subprocess).
This means that it should be avoided to use the package `subprocess` at
all, as the package has possible security implications. At the moment,
however, the package is used because we need a package with which
external programmes can be started from the Python source code and no
other suitable package that can be used has been found so far.

### Subprocess without shell equals true

Another error message that occurred is [B603:
subprocess_without_shell_equals_true](https://bandit.readthedocs.io/en/latest/plugins/b603_subprocess_without_shell_equals_true.html).
This error occurs e.g. here:

    subprocess.Popen(
        ["C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe",
        shell=False
        )

This error message has a low severity level. The error message is
intended to draw attention to the fact that this application of the
method has no vulnerability to shell injection, but the arguments passed
must still be checked for validity.

The problem with this error message is that it may be that the error
message is false positive.

> B603 is subprocess_without_shell_equals_true... without. So it knows
> that shell=False.
>
> However there can still be a problem: bandit is looking at
> subprocess.check_output(args, shell=False) and sees check_output with
> argument args.
>
> Bandit doesn't know that args is safe. It just sees a variable which
> could have come from anywhere.
>
> Unfortunately bandit isn't a code-flow analysis tool so it can't
> reason about what args is. It just flags a warning. You manually check
> the warning and decide to either add \# nosec at the end of the line
> or to turn off this B603 test if you find it unhelpful.
>
> It's a false positive but the test is functioning as designed, as a
> simple linter to warn about possible issues.

This quote was found in [a Github issue
discussion](https://github.com/PyCQA/bandit/issues/333#issuecomment-404103697).

For the demos, `subprocess.Popen()` is used because, unlike
`subprocess.check_output()`, it is a **non-blocking**
[method](https://stackoverflow.com/questions/38088631/what-is-a-practical-difference-between-check-call-check-output-call-and-popen-m)
and the execution of the demos by opening e.g. Thunderbird should still
continue and not wait.

If it is decided that only `subprocess.check_output()` should be used,
the package
[multiprocessing](https://docs.python.org/3/library/multiprocessing.html)
can be helpful.

### Start process with a shell

Tests were also made to see if Bandit also gives error messages when,
for example, `os.popen()` is used. The error message [B605:
start_process_with_a_shell](https://bandit.readthedocs.io/en/latest/plugins/b605_start_process_with_a_shell.html)
was thrown, which simply informs that while starting a process with a
shell currently looks safe, this may change in the future, so consider
rewriting this to not use a shell.

### Conclusion

In conclusion, the current use of `subprocess` is fine, but still needs
to be kept in mind. It should also be investigated whether there is an
alternative package that can be used instead of `subprocess` or whether
there is another way to start external programmes within the Python
code. For the problem that the main process with the demo should not be
stopped, the package `multiprocessing` can help.
