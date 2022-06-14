abstract class BaseProvider<T, E> {
  Future<E> fetch(T id);
  Future<E> add(E obj);
  Future<E> update(T id, E obj);
  Future<T> delete(T id);
  Future<List<E>> fetchAll();
}
