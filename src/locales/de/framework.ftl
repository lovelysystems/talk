### Localizations for framework.
### All keys must start with `framework` because this file is shared
### among different targets.

## Validation

framework-validation-required = Dies ist ein Pflichtpfeld.
framework-validation-tooShort = Bitte mindestens {$minLength} Zeichen eingeben.
framework-validation-tooLong = Bitte maximal {$maxLength} Zeichen eingeben.
framework-validation-usernameTooShort = Der Benutzername muss mindestens {$minLength} Zeichen enthalten.
framework-validation-usernameTooLong = Der Benutzername darf maximal {$maxLength} Zeichen lang sein.
framework-validation-invalidCharacters = Nicht zulässige Zeichen. Bitte nochnam versuchen.
framework-validation-invalidEmail = Bitte geben Sie eine gültige E-Mail ein.

framework-timeago-just-now = Gerade eben
framework-timeago =
  { $suffix ->
     [ago] vor
    *[unknown] unbekannt
  }
  { $value }
  { $unit ->
    [second] { $value ->
       [1] Sekunde
      *[other] Sekunden
    }
    [minuto] { $value ->
       [1] Minute
      *[other] Minuten
    }
    [hour] { $value ->
       [1] Stunde
      *[other] Stunden
    }
    [day] { $value ->
       [1] Tag
      *[other] Tage
    }
    [week] { $value ->
       [1] Woche
      *[other] Wochen
    }
    [month] { $value ->
      [1] Monat
      *[other] Monate
    }
    [year] { $value ->
       [1] Jahr
      *[other] Jahre
    }
    *[other] unknown unit
  }

framework-copyButton-copy = Kopieren
framework-copyButton-copied = Kopiert
