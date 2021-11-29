using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace webapp3.Helpers
{
    public static class PasswordValidation
    {
        private static readonly Lazy<string[]> words = new Lazy<string[]>(() =>
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "DICT.TXT");
            return GetDictionaryWords(path);
        });

        public static bool ValidatePassword(string input, out string errorMessage)
        {
            errorMessage = string.Empty;

            var hasLowerChar = new Regex(@"[a-z]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasNumber = new Regex(@"[0-9]+");
            var hasSymbols = new Regex(@"[!@#$%^&*()_+=\[{\]};:<>|./?,-]");
            var hasMinimum8Chars = new Regex(@".{8,}");
            var hasRepetition = new Regex(@"(\w)\1+");

            if (string.IsNullOrWhiteSpace(input))
            {
                errorMessage = "Password should not be empty or whitespace";
                return false;
            }
            if (!hasLowerChar.IsMatch(input))
            {
                errorMessage = "Password should contain at least one lower case letter";
                return false;
            }
            else if (!hasUpperChar.IsMatch(input))
            {
                errorMessage = "Password should contain at least one upper case letter";
                return false;
            }
            else if (!hasNumber.IsMatch(input))
            {
                errorMessage = "Password should contain at least one numeric value";
                return false;
            }
            else if (!hasSymbols.IsMatch(input))
            {
                errorMessage = "Password should contain at least one special character";
                return false;
            }
            else if (!hasMinimum8Chars.IsMatch(input))
            {
                errorMessage = "Password should not be less than 8 characters";
                return false;
            }
            else if (hasRepetition.IsMatch(input))
            {
                errorMessage = "Password should not contain repetitions such as 'aa'";
                return false;
            }
            else if (ContainsSequence(input))
            {
                errorMessage = "Password should not contain ascending sequences such as 'ab'";
                return false;
            }
            else if (ContainsDictWord(input))
            {
                errorMessage = "Password should not contain dictionary words";
                return false;
            }
            else
            {
                return true;
            }
        }

        private static bool ContainsSequence(string input)
        {
            for (var i = 0; i < input.Length - 1; i++)
            {
                if (char.IsLetterOrDigit(input[i]) && input[i] != '9' && input[i] != 'z' && input[i] != 'Z' && input[i] + 1 == input[i + 1])
                    return true;
            }
            return false;
        }

        private static bool ContainsDictWord(string input)
        {
            for (int i = 0; i < input.Length; i++)
            {
                for (int j = i + 2; j < input.Length; j++)
                {
                    var subString = input.Substring(i, j - i + 1);
                    if (words.Value.Contains(subString))
                        return true;
                }
            }
            return false;
        }

        private static string[] GetDictionaryWords(string path)
        {
            var lines = new string[] { };

            try
            {
                lines = File.ReadAllLines(path);
            }
            catch (System.Exception)
            {
                // TODO: handle error, e.g. log
            }
            return lines.Where(it => it.Length >= 3).ToArray();
        }
    }
}
