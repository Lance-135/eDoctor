from django.core.cache import cache

cache.set("test_key", "hello redis", timeout=60)
print(cache.get("test_key"))