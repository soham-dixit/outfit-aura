from googletrans import Translator

translator = Translator()

def detect_language(text):
    detection = translator.detect(text)
    return detection.lang

def translate_to_english(text):
    return translator.translate(text, dest='en').text

def translate_to_user_language(text, target_language):
    return translator.translate(text, dest=target_language).text
